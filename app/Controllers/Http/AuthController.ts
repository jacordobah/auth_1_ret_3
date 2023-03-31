import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'


export default class AuthController {

    public async register({request, auth}: HttpContextContract){
        const name = request.input('name');
        const lastname = request.input('lastname');
        const perfil = request.input('perfil');
        const num_documento_usuario = request.input('num_documento_usuario');
        const direccion = request.input('direccion');
        const barrio = request.input('barrio');
        const municipio = request.input('municipio');
        const departamento = request.input('departamnto');
        const email = request.input('email');
        const password = request.input('password');

        const user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.lastname = lastname;
        user.perfil = perfil;
        user.num_documento_usuario = num_documento_usuario;
        user.direccion = direccion;
        user.barrio = barrio;
        user.municipio = municipio;
        user.departamento = departamento;
        await user.save();

        const token = await auth.use("api").login(user,{
            expiresIn: "30 mins" //tiempo de expiracion 
        });
        Env.set('SESSION',user.perfil)
        return{
            token,
            "msg": "usuario registrado correctamente"
        }
    }

    public async login({auth, request, response}: HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');
        try{
            console.log("entra al try")
            const token = await auth.use("api").attempt(email, password,{
                expiresIn: "60 mins"
            });
            console.log('paso la validacion');
            const user = await  User.query().select('perfil').where('email','=', email);
            console.log("paso la consulta");
            console.log(user[0].$attributes['perfil'])
            
            if(user){
                Env.set('SESSION',user[0].$attributes['perfil']);
                console.log(Env.get('SESSION'));
            }
            console.log('paso el cambio de var session');
            return{
                token,
                "msg":"usuario logueado correctamente"
            } 
        }catch(error){
            return response.unauthorized('error al hacer login');
            console.log(error)
        }
    }

    public async delete({request}: HttpContextContract){
        const sesion = process.env.SESSION
        if(sesion == "1"){
            try{
                const id = request.param('num_documento_usuario');
                await User.query().where('num_documento_usuario', id).delete();
                return("registro eliminado"); 
            }catch(error){
                console.log(error);
                return({"msg":"no es posoible eliminarlo, puede que no exista en db"})
            }
        }else{
           return ({"msg":"No tiene permiso para esta accion"})   
        }
    }

    public async update({request, params}: HttpContextContract){
        const sesion = process.env.SESSION
        if(sesion == "1"){
            const user = await User.find(params.id);
            if(user){
                user.name = request.input('name');
                user.lastname = request.input('lastname');
                user.perfil = request.input('perfil');
                user.num_documento_usuario = request.input('num_documento_usuario');
                user.direccion = request.input('direccion');
                user.barrio = request.input('barrio');
                user.municipio = request.input('municipio');
                user.departamento = request.input('departamnto');
                user.email = request.input('email');
                user.password = request.input('password');
                
                if (await user.save()){
                    return {
                        "msg": "actualizado correctamente",
                        user
                    }  
                }
                return ({
                    "msg": "no se pudo actualizar",
                    "estado": 401
                });
            }
            return ({
                "msg": "registro no encontrado",
                "estado": 401
            });
        }else{
            return ({"msg":"No tiene permiso para esta accion"})   
        }
    }

    public async getAllUsers(): Promise<User[]> {
        const sesion = process.env.SESSION
        if(sesion == "1"){
            const user = await User.all();
            return user;
        }else{
            const user = [new User(),new User()];
            user[0].name = "acceso denegado";
            return user;

        }
    }

       
}
