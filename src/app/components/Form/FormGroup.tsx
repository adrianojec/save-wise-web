import { Form } from "react-bootstrap"

interface Props {
   label: string,
   type: string,
   placeholder: string,
   width?: "w-25" | "w-50" | "w-75" | "w-100",
   className?: string,
   onChange: (evt: any) => void,
}

const FormGroup = ({ label, type, placeholder, width = "w-100", className, onChange }: Props) => {
   return (
      <Form.Group className={`${width} ${className} mb-3 me-2`}>
         <Form.Label>{label}</Form.Label>
         <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={onChange}
         />
      </Form.Group>
   )
}

export default FormGroup
