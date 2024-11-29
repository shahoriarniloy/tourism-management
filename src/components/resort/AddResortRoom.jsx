import React from 'react';

const AddResortRoom = () => {
    return (
        <div>
            <div className="font-[sans-serif]">
                <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-36"></div>
                <div className="-mt-20 mb-6 px-4">
                    <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-lg">
                        <h2 className="text-xl text-gray-800 font-bold">Add Resort Room </h2>

                        <form className="mt-8 grid sm:grid-cols-2 gap-6">
                            <div>
                                <input type='text' placeholder='Name'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <input type='email' placeholder='Email'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <input type='email' placeholder='Phone No.'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <input type='text' placeholder='Website'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <input type='text' placeholder='Company'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <input type='text' placeholder='Subject'
                                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
                            </div>
                            <div>
                                <textarea placeholder='Message' rows="6"
                                    className="col-span-full w-full rounded-lg px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"></textarea>
                            </div>
                            <div className="flex items-center col-span-full">
                                <input id="checkbox1" type="checkbox"
                                    className="w-4 h-4 mr-3" />
                                <label for="checkbox1" className="text-sm text-gray-400">I agree to the <a href="javascript:void(0);" className="underline">Terms and Conditions</a> and <a href="javascript:void(0);" className="underline">Privacy Policy</a></label>
                            </div>

                            <button type='button'
                                className="text-white w-max bg-[#007bff] hover:bg-blue-600 rounded-lg text-sm px-6 py-3 mt-4 tracking-wide">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2 inline" viewBox="0 0 548.244 548.244">
                                    <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                                </svg>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddResortRoom;