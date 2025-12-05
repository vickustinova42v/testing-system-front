import Form from 'next/form'

interface IAuthForm {
    action: string;
    title: string;
    isRegister?: boolean;
    buttonCaption: string;
}

export default function AuthForm(props: IAuthForm) {
    return (
        <Form className='auth-form' action={ props.action }>
            <h1 className='text-white'>
                { props.title }
            </h1>
            { props.isRegister && (
                <>
                    <input name="last_name" required placeholder='Имя'/>
                    <input name="first_name" required placeholder='Фамилия'/>
                    <input name="fathers_name" placeholder='Отчетство'/>
                </>
            )}
            <input name="email" required placeholder='E-mail'/>
            <input name="password" required placeholder='Пароль'/>
            <button type="submit">
                { props.buttonCaption }
            </button>
        </Form>
    )
}