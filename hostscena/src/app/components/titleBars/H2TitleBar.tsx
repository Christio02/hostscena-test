// components/TitleBar.jsx (or wherever you place your components)

/**
 * Renders a title within a full-width black bar.
 * Assumes the parent container provides necessary horizontal padding if needed.
 * 
 * @param {object} props - The component props.
 * @param {string} props.title - The text to display in the title bar.
 * @param {string} [props.className] - Optional additional CSS classes for the outer div.
 */
export default function H2TitleBar({ title, className = '' }) {
  return (
    // The main container div
    // bg-black: Sets the background to black
    // text-white: Sets the default text color inside to white
    // py-4: Adds vertical padding (adjust value like py-3, py-5 as needed)
    // px-5: Adds horizontal padding (adjust value like px-4, px-6 or remove if parent handles it)
    // The div will naturally take the full width of its parent container
    <div className={`bg-black text-white py-4 px-[20px] ${className}`}> 
      <h2 className="text-h2 font-title"> {/* Or use appropriate text size/font class */}
        {title}
      </h2>
    </div>
  );
}