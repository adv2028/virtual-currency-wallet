type Props = {
  onClick: () => void
  title: string
  disabled?: boolean
}

export const Button = ({ onClick, title, disabled }: Props) => {
  return (<button onClick={onClick} className="py-3 px-6 bg-blue-300 text-black font-bold rounded-md disabled:bg-gray-200 cursor-pointer disabled:cursor-auto" disabled={disabled}>{title}</button>)
}