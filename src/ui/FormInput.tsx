import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormInputProps {
  children: ReactNode;
  label: string;
  error?: string;
}

const FormInputLayout = styled.div`
  display: flex;
  gap: 15px;
  width: 75%;
  &:hover {
    cursor: pointer;
  }
  label {
    width: 50px;
  }
  span {
    color: red;
  }
`;

function FormInput({ children, label, error }: FormInputProps) {
  return (
    <FormInputLayout>
      {/* jsx는 html태그,컴포넌트 등 */}
      {React.isValidElement(children) && <label htmlFor={children.props?.id}>{label}</label>}
      {/* react.isvalidElement는 유효한 react요소일때 true를 반환한다
      전달된 값이 객체이며 typeof 속성이 있고, react요소의 고유 심볼을 갖고 있나를 체킹해서 true false값을 낸다 */}
      {/* 이과정을 통해 내가 받은children은 유효한 jsx요소라는걸 입증하면 children.props를 쓸수있다 */}
      {children}
      {error && <span>{error}</span>}
    </FormInputLayout>
  );
}
export default FormInput;
