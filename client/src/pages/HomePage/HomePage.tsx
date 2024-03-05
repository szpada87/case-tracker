// TODO: add styling
// TODO: create content with prose
function HomePage() {
    return (
        <main className='w-full' >
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" />
                    <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Integer nec consectetur felis. Vivamus sagittis auctor magna, eget imperdiet orci hendrerit mollis.</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper, urna ac aliquet pretium, massa purus elementum velit, et lobortis metus turpis imperdiet eros. Nunc mi turpis, dapibus vitae lacus et, bibendum faucibus nisl. Donec maximus bibendum tortor, et auctor nunc sagittis et. Nam tempus felis et iaculis sollicitudin. Vivamus mollis commodo suscipit. Maecenas lobortis, arcu ullamcorper mattis ornare, odio dui venenatis sem, eget dignissim ex justo non libero. Fusce ut tellus non purus euismod vestibulum. Donec commodo, risus sed vestibulum aliquam, lacus nulla lacinia purus, dignissim convallis nulla justo vel libero. Vestibulum ut elit lobortis, vulputate elit in, laoreet sapien. Vivamus quis faucibus elit. Sed consectetur dui sit amet nisi tincidunt tempus id nec dui.</p>
                        <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </section>
            
        </main>
    )
}

export default HomePage