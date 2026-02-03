function Heading({ as = "h1", children, className = "", ...props }) {
    const Component = as;
    const baseClasses = {
        h1: "md:text-4xl sm:text-3xl text-2xl font-bold text-gray-800 mb-2",
        h2: "md:text-3xl sm:text-2xl text-xl font-bold text-gray-800 mb-2",
        h3: "md:text-2xl sm:text-xl text-lg font-bold text-gray-800 mb-2",
        h4: "md:text-xl sm:text-lg text-base font-bold text-gray-800 mb-2",
    };

    return (
        <Component className={`${baseClasses[as]} ${className}`} {...props}>
            {children}
        </Component>
    );
}

export default Heading;