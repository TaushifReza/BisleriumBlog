import React from 'react';

function TechBlog() {
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* header */}
      <header className="flex items-center justify-between py-2">
        <a href="#" className="px-2 lg:px-0 font-bold">
          Tech Blog
        </a>
        <button className="block md:hidden px-2 text-3xl">
          <i className='bx bx-menu'></i>
        </button>
        <ul className="hidden md:inline-flex items-center">
          <li className="px-2 md:px-4">
            <a href="" className="text-green-800 font-semibold hover:text-green-600"> Home </a>
          </li>
          <li className="px-2 md:px-4">
            <a href="" className="text-gray-500 font-semibold hover:text-green-600"> About </a>
          </li>
          <li className="px-2 md:px-4">
            <a href="" className="text-gray-500 font-semibold hover:text-green-600"> Press </a>
          </li>
          <li className="px-2 md:px-4">
            <a href="" className="text-gray-500 font-semibold hover:text-green-600"> Contact </a>
          </li>
          <li className="px-2 md:px-4 hidden md:block">
            <a href="" className="text-gray-500 font-semibold hover:text-green-600"> Login </a>
          </li>
          <li className="px-2 md:px-4 hidden md:block">
            <a href="" className="text-gray-500 font-semibold hover:text-green-600"> Register </a>
          </li>
        </ul>
      </header>
      {/* header ends here */}

      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales, massa et auctor.
            </h2>
            <a 
              href="#"
              className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            >
              Cryptocurrency
            </a>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" 
            className="w-full object-cover lg:rounded" 
            style={{ height: '28em' }}
            alt="blog"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6">Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is
              justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an. She projection
              advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay
              was outlived peculiar rendered led six.</p>
            {/* More paragraphs... */}
          </div>

          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <img 
                  src="https://randomuser.me/api/portraits/men/97.jpg"
                  className="h-10 w-10 rounded-full mr-2 object-cover" 
                  alt="profile"
                />
                <div>
                  <p className="font-semibold text-gray-700 text-sm"> Mike Sullivan </p>
                  <p className="font-semibold text-gray-600 text-xs"> Editor </p>
                </div>
              </div>
              <p className="text-gray-700 py-3">
                Mike writes about technology Yourself required no at thoughts delicate landlord it be. Branched dashwood do
                is whatever it.
              </p>
              <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                Follow 
                <i className='bx bx-user-plus ml-2' ></i>
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* main ends here */}

      {/* footer */}
      <footer className="border-t mt-12 pt-12 pb-32 px-4 lg:px-0">
        <div> 
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" 
            className="h-12 w-12" 
            alt="logo"
          />
        </div>
        {/* More footer content... */}
      </footer>
    </div>
  );
}

export default TechBlog;