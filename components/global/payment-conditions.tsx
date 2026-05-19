import { RotateCcw, ShieldCheck, Truck } from "lucide-react"


const PaymentConditions = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white rounded-2xl p-6 mt-16">
                <div className="flex flex-col gap-3 group">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-black text-sm uppercase tracking-wider">Envío Gratis</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">En pedidos superiores a 30€</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 group">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-black text-sm uppercase tracking-wider">Pago Seguro</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Encriptación SSL avanzada</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 group">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <RotateCcw className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-black text-sm uppercase tracking-wider">Devoluciones</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Plazo extendido de 30 días</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentConditions