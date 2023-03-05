import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  control?: any
  errors?: any
}

const Input = forwardRef(
  (
    { label, placeholder, type, onChange: onChangeE, name }: InputProps,
    ref
  ) => {
    const { register } = useFormContext()

    return (
      <div className="input flex flex-col gap-2">
        <label className="font-bold">{label}</label>
        <input
          className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}
          type={type}
          placeholder={placeholder}
          {...register(name!)}
        />
      </div>
    )
  }
)
export default Input
