import { AppState } from '../types';

interface Props {
  state: AppState;
}

export function LlamadorView({ state }: Props) {
  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <div className="bg-yellow-400 py-8 px-6 shadow-2xl">
        <div className="flex items-center justify-center">
          <img 
            src="/Logo Mi Gusto 2025.png" 
            alt="Mi Gusto" 
            className="h-24 w-auto object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-[3] bg-orange-600 p-8 overflow-hidden flex flex-col border-b-8 border-gray-900">
          <h2 className="text-5xl font-bold text-white mb-8 text-center uppercase tracking-wide">
            En Preparación
          </h2>
          <div className="flex-1 overflow-y-auto">
            {state.enPreparacion.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-white text-4xl opacity-50 font-bold">
                  Sin pedidos
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 pb-6">
                {state.enPreparacion.map((pedido) => (
                  <div
                    key={pedido.timestamp}
                    className="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center animate-fadeIn"
                  >
                    <span className="text-8xl font-black text-gray-900">
                      {pedido.numero}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-[2] bg-green-700 p-8 overflow-hidden flex flex-col">
          <h2 className="text-5xl font-bold text-white mb-8 text-center uppercase tracking-wide">
            A Retirar
          </h2>
          <div className="flex-1 overflow-y-auto">
            {state.aRetirar.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-white text-4xl opacity-50 font-bold">
                  Sin pedidos listos
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 pb-6">
                {state.aRetirar.map((pedido) => (
                  <div
                    key={pedido.timestamp}
                    className="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center animate-fadeIn animate-pulse"
                  >
                    <span className="text-8xl font-black text-gray-900">
                      {pedido.numero}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
