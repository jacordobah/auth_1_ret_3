import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'
//import User from 'App/Models/User';
//import Env from '@ioc:Adonis/Core/Env'

export default class PerfilsController {

    async setPerfil({request, response}: HttpContextContract){
        const sesion = process.env.SESSION
        if(sesion == "1"){
            try{
                const descripcion = request.only(['descripcion'])
                const validar = await Perfil.query().where('descripcion','like', `${descripcion}%`);
                if(validar){
                    //console.log(descripcion)
                    await Perfil.create(descripcion)
                    response.status(200).json({"msg": "Registro de perfil completado"})
                } else {
                    response.status(400).json({"msg":"Error, el codigo perfil ya se encuentra registrado"})
                }
            }catch(error){
                console.log(error)
                response.status(500).json({"msg":"Error en el servidor !!"})
            }
        }else{
            response.status(500).json({"msg":"No tiene permiso para esta accion"})   
        }
    }

    public async update({request}: HttpContextContract){
        const sesion = process.env.SESSION
        const {id, descripcion} = request.all();
        console.log(descripcion);
        if(sesion == "1"){
            const codigo = id//request.param(id); 
            const perfil = await Perfil.findOrFail(codigo) 
            const datos = request.all();
            perfil.descripcion = datos.descripcion,  
            await perfil.save()
            return("Registro actualizado")
        }else{
            return ({"msg":"No tiene permiso para esta accion"})   
        }

    }

    public async delete({request}: HttpContextContract){
        const sesion = process.env.SESSION
        const {id} = request.all();
        if(sesion == "1"){
            //const id = request.param('id');
            await Perfil.query().where('id', id).delete();
            return("registro eliminado"); 
        }else{
            return ({"msg":"No tiene permiso para esta accion"})   
        }
    }

    public async getAllProfiles(): Promise<Perfil[]> {
        const sesion = process.env.SESSION
        if(sesion == "1"){
            const user = await Perfil.all();
            return user;
        }else{
            const perfil = [new Perfil(),new Perfil()];
            perfil[0].descripcion = "acceso denegado";
            return perfil;

        }
    }
}
