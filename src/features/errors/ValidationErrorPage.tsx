interface Props {
    errors: string[];
}

const ValidationErrorPage = ({ errors }: Props) => {
    return (
        <>
            <div>
                {errors && (
                    <ul>
                        {errors.map((err: string, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default ValidationErrorPage
