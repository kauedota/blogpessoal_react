interface SpinnerProps {
    className?: string
}

// Anel giratório com fade em gradiente (cor herdada via currentColor, tamanho via h-*/w-*)
function Spinner({ className = 'h-8 w-8 text-primary' }: SpinnerProps) {
    return (
        <span
            role="status"
            aria-label="Carregando"
            className={`inline-block animate-spin rounded-full ${className}`}
            style={{
                background: 'conic-gradient(from 180deg, transparent, currentColor)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
            }}
        />
    )
}

export default Spinner
