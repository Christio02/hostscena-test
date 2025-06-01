import LocationCard from './LocationCard'
import locations from '@/mockdata/locations'

export default function LocationContainer() {
    return (
        <div className="flex gap-[20px] flex-wrap justify-center min-w-[750px]">
            {locations.map((loc) => (
                <LocationCard key={loc.name} location={loc} />
            ))}
        </div>
    )
}