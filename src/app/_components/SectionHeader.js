import { lato } from "../layout"
import Heading from "./Heading"

function SectionHeader({ title, subtitle }) {
    return (
        <div className="mb-4">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4">
                    <p className="w-12 h-[2px] bg-text"></p>
                    <Heading as="h2" className="text-2xl font-bold text-gray-800">{title}</Heading>
                    <p className="w-12 h-[2px] bg-text"></p>
                </div>
                {subtitle && <p className={`text-gray-600 sm:text-base text-sm ${lato.className}`}>{subtitle}</p>}
            </div>
        </div>
    )
}

export default SectionHeader
