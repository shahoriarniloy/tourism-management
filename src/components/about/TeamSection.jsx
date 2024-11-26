import Image from 'next/image';
import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Shahoriar Azad Niloy',
      role: 'Founder & Director',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Devesh Biswas',
      role: 'Chief Operating Officer',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Md Shamim',
      role: 'Director - Hotels',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Rabindro nath barman',
      role: 'Chief Executive',
      image: '/images/about/1.JPG',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      },
    },
  ];

  return (
    <div className="py-10">
      <div className="w-full lg:px-32 mx-auto text-center">
        <h4 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black">
          Team
        </h4>
        <h2 className="text-2xl lg:text-3xl font-semibold my-4">Our Amazing Team</h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className=" w-full text-center bg-white shadow-lg rounded-lg p-4"
            >
              <div className="w-full h-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={924}
                  height={1087}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{member.role}</p>

              <div className="flex justify-center gap-4">
                {member.socialLinks.facebook && (
                  <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook text-blue-600 text-lg"></i>
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter text-blue-400 text-lg"></i>
                  </a>
                )}
                {member.socialLinks.linkedin && (
                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin text-blue-700 text-lg"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
