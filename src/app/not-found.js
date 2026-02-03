import ButtonLink from "./_components/ButtonLink"

function notFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center 
            justify-center px-4 text-center">
            <h1 className="md:text-6xl text-3xl mb-4">404 - Page Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>

            <div>
                <ButtonLink href="/" className="mt-6 btn btn-primary">
                    Go to Home
                </ButtonLink>
            </div>
        </div>
    )
}

export default notFound
