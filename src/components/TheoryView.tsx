import { BookOpen } from 'lucide-react';

export function TheoryView() {
  return (
    <section className="card-panel">
      <div className="card-title">
        <BookOpen className="text-cyan-400" size={24} />
        ¿Qué es el algoritmo de Luhn y cómo funciona?
      </div>
      <div className="theory-content">
        <p>
          El <strong>algoritmo de Luhn</strong>, también conocido como «fórmula de Luhn», «módulo 10» o algoritmo «mod 10», es una fórmula de suma de comprobación simple que se utiliza para validar números de identificación. Fue desarrollado por el ingeniero de IBM <strong>Hans Peter Luhn</strong> y patentado en 1954.
        </p>
        <p>
          Se utiliza ampliamente en la verificación de tarjetas de crédito (Visa, Mastercard, American Express), números IMEI de teléfonos móviles, números de cuentas bancarias y códigos de barras. Su propósito principal es proteger contra errores accidentales de transcripción o entrada de datos.
        </p>

        <h3>Fórmula y Algoritmo Paso a Paso</h3>
        <ul>
          <li><strong>Paso 1: Duplicación alternada.</strong> Comenzando desde el dígito inmediatamente a la izquierda del dígito verificador (o desde el último dígito si se valida un número completo), ir de derecha a izquierda duplicando el valor de cada segundo dígito.</li>
          <li><strong>Paso 2: Reducción de dígitos.</strong> Si la duplicación de un dígito resulta en un número mayor o igual a 10 (por ejemplo, 8 × 2 = 16), se suman los dígitos del resultado (1 + 6 = 7) o equivalentemente se le restan 9.</li>
          <li><strong>Paso 3: Suma total.</strong> Se suman todos los dígitos reducidos junto con los dígitos que no fueron duplicados del número original.</li>
          <li><strong>Paso 4: Comprobación.</strong> Si el total obtenido es múltiplo de 10 (es decir, Total mod 10 = 0), el número es válido según la fórmula de Luhn. De lo contrario, no es válido.</li>
        </ul>

        <h3>Métodos para obtener el Dígito Verificador (x)</h3>
        <p>Dada una suma parcial de los dígitos reducidos S:</p>
        <ul>
          <li><strong>Método 1 (Multiplicación por 9):</strong> x = (S × 9) mod 10.</li>
          <li><strong>Método 2 (Resta de Módulo):</strong> Se toman las unidades de S (es decir, U = S mod 10). El dígito de chequeo es (10 - U) mod 10.</li>
        </ul>
      </div>
    </section>
  );
}
