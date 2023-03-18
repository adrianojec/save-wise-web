import { useState } from "react"
import { Form } from "react-bootstrap"

interface Props {
   type: string,
   placeholder?: string,
   onChange?: (evt: any) => void,
   defaultValue?: string,
   label?: string,
   isRequired?: boolean,
   width?: "w-25" | "w-50" | "w-75" | "w-100",
   className?: string,
   validationMessage?: string
}

const FormGroup = ({
   type,
   placeholder,
   defaultValue,
   label,
   isRequired = false,
   width = "w-100",
   className,
   onChange,
   validationMessage
}: Props) => {
   const [isEmpty, setIsEmpty] = useState<boolean>();

   return (
      <Form.Group className={`${width} ${className} mb-3 me-2`}>
         {!!label && <Form.Label>{label}</Form.Label>}
         <Form.Control
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={evt => {
               setIsEmpty(!evt.target.value);
               !!onChange && onChange!(evt.target.value);
            }}
            onFocus={() => setIsEmpty(true)}
            isInvalid={isRequired && isEmpty}
            required={isRequired}
            isValid={isRequired && isEmpty == false}
         />
         {isEmpty && <Form.Control.Feedback type="invalid">
            {validationMessage}
         </Form.Control.Feedback>}
      </Form.Group>
   )
}

export default FormGroup
