import { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <p className='mt-2 text-red-500'>{children}</p>
  )
}

export default ErrorMessage
