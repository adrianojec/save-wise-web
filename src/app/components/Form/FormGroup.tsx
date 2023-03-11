import { useState } from "react"
import { Form, InputGroup } from "react-bootstrap"
import { EMPTY_STRING } from "../../utilities/constants";

interface Props {
   label: string,
   type: string,
   placeholder: string,
   onChange: (evt: any) => void,
   isRequired?: boolean,
   width?: "w-25" | "w-50" | "w-75" | "w-100",
   className?: string,
   validationMessage?: string
}

const FormGroup = ({ label, type, placeholder, isRequired = false, width = "w-100", className, onChange, validationMessage }: Props) => {
   const [isEmpty, setIsEmpty] = useState<boolean>();

   return (
      <Form.Group className={`${width} ${className} mb-3 me-2`}>
         <Form.Label>{label}</Form.Label>
         <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={evt => {
               setIsEmpty(!evt.target.value);
               onChange(evt);
            }}
            onFocus={() => setIsEmpty(true)}
            isInvalid={isEmpty}
            required={isRequired}
            isValid={isEmpty == false}
         />
         {isEmpty && <Form.Control.Feedback type="invalid">
            {validationMessage}
         </Form.Control.Feedback>}
      </Form.Group>
   )
}

export default FormGroup
