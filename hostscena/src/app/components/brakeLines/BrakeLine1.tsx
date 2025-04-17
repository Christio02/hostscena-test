export default function BrakeLine1() {
    return (
        // div is a block element, it will take the full width of its parent by default.
        // my-[10px] adds 10px margin to the top and bottom.
        // border-b-[1px] creates the 1px line using the bottom border.
        // border-black sets the line color.
        <div className="m-[20px] border-b-[1px] border-black">
            {/* No content needed inside */}
        </div>
    );
}