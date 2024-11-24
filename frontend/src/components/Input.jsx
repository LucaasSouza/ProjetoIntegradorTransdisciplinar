import { Button, InputAdornment, TextField } from "@mui/material";

export default function Input({ variant = "outlined", type = "text", label, value, onChange, onBlur, onKeyDown, className = '', style = {}, adornment = null, required = false }) {
    return (
        <TextField
            autoComplete="off"
            type={type}
            size="small"
            value={value}
            style={style}
            sx={{ "& fieldset": { border: "none" } }}
            label={
                <p className="m-0" style={{ fontSize: 12 }}>
                    { label }
                    { required && <span className="text-danger">*</span> }
                </p>
            }
            variant={variant}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={"bg-light rounded-pill " + className}
            id={label.toUpperCase().replaceAll(' ', '-')}
            slotProps={adornment == null ? {} : {
                input: {
                    [adornment.position + "Adornment"]: (
                        <InputAdornment position={adornment.position}>
                            { adornment.label }
                        </InputAdornment>
                    ),
                }
            }}
        />
    )
}

export const ActionButton = ({ label, onClick, variant = "contained", color = "primary", className = '', style = {} }) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            className={className}
            style={{ ...style, fontSize: 12 }}
        >
            { label }
        </Button>
    )
}

export const ImagemProduto = ({ nome, preco, precoPromocional, descricao }) => {
    const BRLFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    return (
        <div
            className="bg-light rounded border p-2 w-100"
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                minWidth: 120,
                maxWidth: 120
            }}
        >
            <section className="w-100 text-center mb-2">
                <img
                    alt="Logo cupcake"
                    className="rounded"
                    src="/img/produto.png"
                    style={{ width: 100 }}
                />
            </section>

            <section className="w-100 d-flex align-items-end gap-1">
                {
                    (precoPromocional != '0.00' && precoPromocional) && 
                    <p className="m-0 fw-bold text-success">
                        { BRLFormat.format(precoPromocional) }
                    </p>
                }

                <p
                    style={{ fontSize: (precoPromocional != '0.00' && precoPromocional) ? 8 : 14 }}
                    className={`m-0 fw-bold ${(precoPromocional != '0.00' && precoPromocional) ? "text-danger mb-1 text-decoration-line-through" : "text-success"}`}
                >
                    { BRLFormat.format(preco) }
                </p>
            </section>

            <p
                className="m-0"
                style={{
                    fontSize: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                { nome }
            </p>
        </div>
    )
}