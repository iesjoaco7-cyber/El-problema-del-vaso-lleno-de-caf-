# Formularios de recolección

## Formulario A · Perfil del local

`crear_formulario_A.gs` crea en tu cuenta de Google:
- el **Google Form** (36 preguntas en 6 secciones, con validaciones numéricas),
- la **planilla de respuestas** vinculada,
- las hojas **`diccionario`** (pregunta ↔ variable) y **`links`** (URLs e ID de la planilla).

### Cómo ejecutarlo
1. Entrá a https://script.google.com → **Nuevo proyecto**.
2. Borrá el contenido de `Código.gs` y pegá todo `crear_formulario_A.gs`.
3. Arriba, elegí la función **`crearFormularioA`** → **Ejecutar**.
4. Autorizá los permisos (Google avisa "app no verificada" porque el script es tuyo: *Configuración avanzada → Ir a proyecto*).
5. Los links aparecen en el **Registro de ejecución** y en la hoja `links` de la planilla.

> Ejecutalo **una sola vez**: cada ejecución crea un formulario y una planilla nuevos.

### Leer las respuestas en Colab
```python
# Justificación: se lee la planilla directo desde Drive (sin descargar CSV a mano)
# y se renombran las columnas largas con la hoja "diccionario" para trabajar con nombres cortos.
from google.colab import auth
auth.authenticate_user()
import gspread, pandas as pd
from google.auth import default
creds, _ = default()
gc = gspread.authorize(creds)

ID_PLANILLA = 'PEGAR_ACA_EL_ID'          # está en la hoja "links"
ss = gc.open_by_key(ID_PLANILLA)
# La hoja de respuestas se llama "Respuestas de formulario 1" (o "Form Responses 1" en inglés)
hoja_resp = next(w for w in ss.worksheets() if w.title.startswith(('Respuestas', 'Form Responses')))
resp = pd.DataFrame(hoja_resp.get_all_records())
dicc = pd.DataFrame(ss.worksheet('diccionario').get_all_records())
encuesta = resp.rename(columns=dict(zip(dicc.pregunta, dicc.variable)))
encuesta = encuesta.rename(columns={'Marca temporal': 'timestamp', 'Timestamp': 'timestamp'})
encuesta.head()
```
