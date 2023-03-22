# Documentació bàsica del projecte
Alguns dels punts que han de quedar explicats:
 * Objectius
 * Arquitectura bàsica
   * Tecnologies utilitzades
   * Interrelació entre els diversos components
 * Com crees l'entorn de desenvolupament
 <h2>Com desplegues l'aplicació a producció</h2>

- **Oracle**
	- Una vegada que tinguem la màquina virtual creada en oracle, tenim l'usuari que creguem en la màquina virtual, la IP pública i el certificat SSH.  
	- Llavors generem la clau privada, per a això, executem l'aplicació PuTTYgen (una aplicació que s'instal·la automàticament quan instal·lem el Putty). <br> <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkk6B1pg3KXfbFT5ouluHm_0f88-rD0ef5lESwUw&s"  alt="">
	- Una vegada executat el PuTTYgen, li donem a *Load* i triem el certificat ssh. Llavors li donem el botó de *Save  private  key* i ho guardem.  
	- Ja tenim tot el necessari per a poder entrar en la màquina virtual d'Oracle.

- **PuTTY**
	- Per la configuració de Putty, entrem en això, ens dirigim **Connection ---> SSH ---> Auth** <br> <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkk6B1pg3KXfbFT5ouluHm_0f88-rD0ef5lESwUw&s"  alt="">
	- Llavors li donem el botó de *Browse* i triem la clau privada que hem generat de PuTTYgen. Seguidament, ens dirigim a **Session** i posem la IP.  
	- [Opcional]* Si volem guardar la màquina per sempre i no realitzar tots els passos previs cada vegada que volem entrar, podem guardar totes les configuracions, Posant en una identificacion en **Saved sessions** i li donem **Save**.  
	- En el meu cas, el tinc guardat com **Pictionary** i per a accedir en la màquina li dono doble clic en Pictionary i entrem.<br> <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkk6B1pg3KXfbFT5ouluHm_0f88-rD0ef5lESwUw&s"  alt="">
	- I en usuari posem **ubuntu** que el nostre usuari d'ubuntu.

 -  **Labs.inspedralbes.cat**
	 - Creem un domini (WEB) en labs i juntament amb el DNS -> Entrem en el DNS i afegim un altre record cliquen en el botó de suma que veiem  en la fotografia.  <br><img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkk6B1pg3KXfbFT5ouluHm_0f88-rD0ef5lESwUw&s"  alt="">
	- Quan li donem el botó ens apareixerà com imatge de sota i ficarem les dades que apareixen en la fotografia. ¿Per què ho fem això? Perquè volem que el domini que, en aquest cas <a  href="https://g1.pictionary.alumnes.inspedralbes.cat/">g1.pictionary.alumnes.inspedralbes.cat</a>, volem que ataqui directament nostra IP del servidor. <br> <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkk6B1pg3KXfbFT5ouluHm_0f88-rD0ef5lESwUw&s"  alt="">
	 - Per tant, una vegada que ja tenim la configuració feta en labs anirem cap a oracle.  
  

 * Llistat d'endpoints de l'API de backend
    * Rutes
   * Exemples de JSON de peticó
   * Exemples de JSON de resposta i els seus codis d'estat 200? 404?
