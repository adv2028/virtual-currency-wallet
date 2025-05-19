type Props = {
  onClick: () => void
  title: string
  disabled?: boolean
}

export const Button = ({ onClick, title, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className="py-3 px-6 text-black font-semibold rounded-md bg-blue-300 hover:bg-blue-400 transition disabled:bg-gray-200 cursor-pointer disabled:cursor-auto duration-150 disabled:hover:text-black"
      disabled={disabled}
    >
      {title}
    </button>
  )
}
