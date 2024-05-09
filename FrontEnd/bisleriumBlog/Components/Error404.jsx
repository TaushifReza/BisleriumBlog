import React from 'react';

const Error404 = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div>
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    Looks like you've found the doorway to the great nothing
                                </h1>
                                <p className="my-2 text-gray-800">Sorry about that! Please visit our homepage to get where you need to go.</p>
                                <div className="text-center">
                                <button><a href="/" className="bg-sky-600 text-white font-medium text-sm  px-14 py-3 mt-8 inline-block">Go to Home</a></button>
                             </div>
                             </div>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404 illustration" />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" className="object-cover h-full" />
                </div>
            </div>
        </div>
    );
};

export default Error404;
