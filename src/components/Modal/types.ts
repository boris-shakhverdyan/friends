export type TModalProps = {
    title: string;
    body?: null | string;
    onDanger?: null | CallableFunction;
    onSuccess?: null | CallableFunction;
    onWarning?: null | CallableFunction;
    onDefault?: null | CallableFunction;
    onCancel?: null | CallableFunction;
    successContent?: string;
    defaultContent?: string;
    dangerContent?: string;
    warningContent?: string;
};
