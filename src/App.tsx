import { useState } from 'react';
import { Monitor, Calculator } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ContadorView } from './components/ContadorView';
import { LlamadorView } from './components/LlamadorView';
import { Pedido } from './types';

type Vista = 'contador' | 'llamador';

function App() {
  const [state, setState] = useLocalStorage(); 
  const [vista, setVista] = useState<Vista>(() => {
    try {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('llamador')) return 'llamador';
      if (path.includes('contador')) return 'contador';

      const params = new URLSearchParams(window.location.search);
      const urlVista = params.get('vista');
      return urlVista === 'llamador' ? 'llamador' : 'contador';
    } catch {
      return 'contador';
    }
  });

  const handleIncrement = () => {
    setState((prev) => ({
      ...prev,
      contadorActual: prev.contadorActual + 1,
    }));
  };

  const handleDecrement = () => {
    setState((prev) => ({
      ...prev,
      contadorActual: Math.max(1, prev.contadorActual - 1),
    }));
  };

  const handleEnviar = () => {
    const nuevoPedido: Pedido = {
      numero: state.contadorActual,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      enPreparacion: [...prev.enPreparacion, nuevoPedido],
      contadorActual: prev.contadorActual + 1,
    }));
  };

  const handleMoverARetirar = (numero: number) => {
    setState((prev) => {
      const pedido = prev.enPreparacion.find((p) => p.numero === numero);
      if (!pedido) return prev;

      return {
        ...prev,
        enPreparacion: prev.enPreparacion.filter((p) => p.numero !== numero),
        aRetirar: [...prev.aRetirar, pedido],
      };
    });
  };

  const handleEliminar = (numero: number, lista: 'enPreparacion' | 'aRetirar') => {
    setState((prev) => ({
      ...prev,
      [lista]: prev[lista].filter((p) => p.numero !== numero),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {vista === 'contador' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b-4 border-yellow-400 shadow-xl">
          <div className="flex justify-center gap-4 p-4">
            <button
              onClick={() => setVista('contador')}
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-xl flex items-center gap-3 shadow-lg"
            >
              <Calculator size={28} />
              Contador
            </button>
            <button
              onClick={() => setVista('llamador')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-lg text-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg"
            >
              <Monitor size={28} />
              Llamador
            </button>
          </div>
        </div>
      )}

      <div className={vista === 'contador' ? 'pt-24' : ''}>
        {vista === 'contador' ? (
          <ContadorView
            state={state}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onEnviar={handleEnviar}
            onMoverARetirar={handleMoverARetirar}
            onEliminar={handleEliminar}
          />
        ) : (
          <LlamadorView state={state} />
        )}
      </div>

      {vista === 'llamador' && !window.location.pathname.toLowerCase().includes('llamador.html') && (
        <button
          onClick={() => setVista('contador')}
          className="fixed bottom-4 right-4 bg-gray-800/70 hover:bg-gray-700 text-yellow-300 p-3 rounded-full shadow-lg transition-all active:scale-95 z-50 flex items-center justify-center"
        >
          <Monitor size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
