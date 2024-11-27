"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Autosuggest from 'react-autosuggest'; 

const ResortManagerRegister = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [countrySuggestions, setCountrySuggestions] = useState([]); 
  const [location, setLocation] = useState(""); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      resortName: event.target["resort-name"].value,
      location: location, 
      phone: event.target.phone.value,
      userType: "resortManager",
    };

    const resp = await fetch("/signup/api", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });

    if (resp.status === 200) {
      const signInResp = await signIn("credentials", {
        email: newUser.email,
        password: newUser.password,
        redirect: false,
      });

      if (signInResp?.status === 200) {
        router.push("/");
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onLocationChange = (event, { newValue }) => {
    setLocation(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.trim() === "") {
      setCountrySuggestions([]);
      return;
    }

    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        const filteredCountries = data
          .map((country) => country.name.common)
          .filter((country) => country.toLowerCase().includes(value.toLowerCase()));
        setCountrySuggestions(filteredCountries);
      });
  };

  const onSuggestionsClearRequested = () => {
    setCountrySuggestions([]);
  };

  const inputProps = {
    placeholder: "Type country...",
    value: location,
    onChange: onLocationChange,
  };

  const suggestionContainerStyles = {
    maxHeight: "50px", 
    position: "absolute",  
    zIndex: 10,            
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",         
  };

  const theme = {
    suggestionsContainer: 'custom-suggestions-container',
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/c6KyHys/travel-concept-with-landmarks-1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Resort Manager Registration
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {showPassword.password ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="********"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {showPassword.confirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="resort-name"
              className="block text-sm font-medium text-gray-600"
            >
              Resort Name
            </label>
            <input
              type="text"
              id="resort-name"
              placeholder="Ocean Breeze Resort"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Country
              </label>
              <Autosuggest
                suggestions={countrySuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={(suggestion) => suggestion}
                renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                inputProps={{
                  ...inputProps,
                  className: "w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                }}
                theme={theme}
                suggestionsContainerStyle={suggestionContainerStyles} // Apply the styles here
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Resort Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="(123) 456-7890"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResortManagerRegister;
