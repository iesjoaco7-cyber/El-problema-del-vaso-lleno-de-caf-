# Genera las imágenes del README a partir de los resultados AGREGADOS del doc 10 (no usa respuestas individuales).
# Uso: python docs/img/generar_graficos.py   (requiere matplotlib, numpy y statsmodels)
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle, Arc
from statsmodels.stats.proportion import proportion_confint
from pathlib import Path
OUT=str(Path(__file__).parent)+'/'   # guarda las imágenes junto a este script
N=18
CAFE='#6F4E37'; GRIS='#A8A29E'; TXT='#1F1F1F'; TXT2='#6B6B6B'; GRID='#E7E5E4'
filas=[ # (etiqueta, k, grupo)
 ('Pre-muele en hora pico',4,'v1'),
 ('Molino con cámara (dosificador)',3,'v1'),
 ('Le queda café molido al cierre',4,'v1'),
 ('El equipo toma el café que sobra',1,'v1'),
 ('Purga el molino al abrir',13,'ok'),
 ('No dosifica siempre con balanza',10,'ok'),
 ('Controla el consumo solo por mes o nunca',7,'ok'),
]
fig,ax=plt.subplots(figsize=(11,5.6),dpi=150)
fig.subplots_adjust(left=0.33,right=0.95,top=0.80,bottom=0.16)
ys=[]; y=0
for i,(lab,k,g) in enumerate(reversed(filas)):
    ys.append(y); y+=1 if not (i==2) else 1.6
for (lab,k,g),y in zip(reversed(filas),ys):
    p=k/N; lo,hi=proportion_confint(k,N,method='wilson')
    c=CAFE if g=='ok' else GRIS
    ax.plot([lo*100,hi*100],[y,y],color=c,lw=2.2,alpha=.55,solid_capstyle='round')
    ax.plot(p*100,y,'o',ms=10,color=c,zorder=3)
    ax.text(hi*100+2,y,f'{k}/{N}  ({p:.0%})',va='center',fontsize=10.5,color=TXT)
ax.set_yticks(ys); ax.set_yticklabels([f[0] for f in reversed(filas)],fontsize=11,color=TXT)
ax.set_xlim(0,100); ax.set_xlabel('% de cafeterías (punto = proporción · línea = IC 95 % de Wilson)',fontsize=10,color=TXT2)
ax.xaxis.set_major_formatter(lambda v,_: f'{v:.0f} %')
ax.grid(axis='x',color=GRID); ax.set_axisbelow(True)
for s in ['top','right','left']: ax.spines[s].set_visible(False)
ax.spines['bottom'].set_color(GRID); ax.tick_params(colors=TXT2,length=0)
ytop=ys[-1]; ymid=(ys[2]+ys[3])/2
ax.text(-0.505,(ys[3]+ys[-1])/2,'HIPÓTESIS\nORIGINAL',transform=ax.get_yaxis_transform(),fontsize=9,color=GRIS,fontweight='bold',ha='left',va='center')
ax.text(-0.505,(ys[0]+ys[2])/2,'LO QUE\nSÍ APARECE',transform=ax.get_yaxis_transform(),fontsize=9,color=CAFE,fontweight='bold',ha='left',va='center')
ax.axhline(ymid,color=GRID,lw=1)
fig.text(0.02,0.93,'La merma no está en el café que sobra: está en purgas, calibración y dosificación',fontsize=14.5,fontweight='bold',color=TXT)
fig.text(0.02,0.87,'Prácticas declaradas por 18 cafeterías · Formulario A · noviembre 2026',fontsize=10.5,color=TXT2)
fig.text(0.02,0.018,'Fuente: encuesta propia (muestra de conveniencia, mayoría de Córdoba). Resultados agregados; n chico, los intervalos son anchos.',fontsize=8.5,color=TXT2)
fig.savefig(OUT+'hallazgos_formulario_A.png',facecolor='white')

# --- Imagen de vista previa 1280x640 ---
fig=plt.figure(figsize=(12.8,6.4),dpi=100); fig.patch.set_facecolor('#F5EFE6')
ax=fig.add_axes([0,0,1,1]); ax.set_xlim(0,1280); ax.set_ylim(0,640); ax.axis('off')
# vaso take away simple
cx,base=1010,150
ax.add_patch(plt.Polygon([[cx-105,base+330],[cx+105,base+330],[cx+80,base],[cx-80,base]],color='white',ec=CAFE,lw=4))
ax.add_patch(plt.Polygon([[cx-118,base+330],[cx+118,base+330],[cx+112,base+365],[cx-112,base+365]],color=CAFE))
ax.add_patch(plt.Polygon([[cx-97,base+260],[cx+97,base+260],[cx+86,base+120],[cx-86,base+120]],color='#C8A27A'))
# barras tipo Pareto dentro de la manga
for i,h in enumerate([95,55,30,18]):
    ax.add_patch(Rectangle((cx-62+i*32,base+132),22,h,color=CAFE))
import numpy as np
t=np.linspace(0,1,50)
for dx in (-30,0,30):
    ax.plot(cx+dx+9*np.sin(t*2*np.pi),base+385+70*t,color=CAFE,lw=3,alpha=.45,solid_capstyle='round')
ax.text(80,430,'El problema del',fontsize=40,color=TXT,fontweight='bold')
ax.text(80,365,'vaso lleno de café',fontsize=52,color=CAFE,fontweight='bold')
ax.text(80,295,'¿Dónde se pierde el café en una cafetería?',fontsize=22,color=TXT)
ax.text(80,255,'Árbol de problemas · Pareto 80/20 · encuesta a 18 cafeterías',fontsize=17,color=TXT2)
ax.text(80,110,'Ciencia de Datos e IA  ·  github.com/iesjoaco7-cyber',fontsize=15,color=TXT2)
fig.savefig(OUT+'social_preview.png',facecolor=fig.get_facecolor())
print('ok')
