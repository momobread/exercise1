import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface FormInputProps {
  children: ReactNode;
  label: string;
  error?: string;
  type?: string;
}
interface FormInputLayoutProps {
  type?: string; // 'vertical' 또는 'horizontal' 값만 받도록 타입 지정
}

const FormInputLayout = styled.div<FormInputLayoutProps>`
  display: flex;
  gap: 15px;

  &:hover {
    cursor: pointer;
  }
  div {
    label {
      display: inline-block;
      width: 50px;
      text-align: center;
      padding-right: 10px;
    }
  }
  span {
    color: red;
  }

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      background-color: aquamarine;
      gap: 2px;
    `}
`;

function FormInput({ children, label, error, type }: FormInputProps) {
  return (
    <FormInputLayout type={type}>
      {/* jsx는 html태그,컴포넌트 등 */}
      <div>
        {React.isValidElement(children) && <label htmlFor={children.props?.id}>{label}</label>}
        {/* react.isvalidElement는 유효한 react요소일때 true를 반환한다
      전달된 값이 객체이며 typeof 속성이 있고, react요소의 고유 심볼을 갖고 있나를 체킹해서 true false값을 낸다 */}
        {/* 이과정을 통해 내가 받은children은 유효한 jsx요소라는걸 입증하면 children.props를 쓸수있다 */}
        {children}
      </div>

      {error && <span>{error}</span>}
    </FormInputLayout>
  );
}
export default FormInput;
