import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './SuperCheckbox.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
   onChangeChecked?: (checked: boolean) => void;
   spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
   onChange,
   onChangeChecked,
   className,
   spanClassName,
   children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
   id,
   checked,
   ...restProps // все остальные пропсы попадут в объект restProps
}) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.currentTarget);
      if (onChange) {
         onChange(e);
      }
      if (onChangeChecked) {
         onChangeChecked(!checked);
      }
   };

   const finalInputClassName = s.checkbox + (className ? ' ' + className : '');

   return (
      <label className={s.label}>
         <input
            checked={checked}
            id={id}
            type={'checkbox'}
            onChange={onChangeCallback}
            className={finalInputClassName}
            {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
         />
         {children && (
            <span id={id ? id + '-span' : undefined} className={s.spanClassName}>
               {children}
            </span>
         )}
      </label> // благодаря label нажатие на спан передастся в инпут
   );
};

export default SuperCheckbox;
