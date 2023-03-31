import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {

    public async store({request}: HttpContextContract){
        const sesion = process.env.SESSION
        console.log(process.env.SESSION)
        if(sesion == "1" || sesion == "2"){
            console.log("entro al if de sesion")
            const book = new Book();
            book.titulo = request.input("titulo");
            book.autor = request.input("autor");
            book.editorial = request.input("editorial");
            book.formato = request.input("formato");
            book.paginas = request.input("paginas");
            book.num_documento_usuario = request.input("num_documento_usuario");

            try{
                await book.save()
                return{
                    "libro": book,
                    "msg": "registro ingresado correctamente",
                    "estado": 200
                }
            }catch(error){
                console.log(error);
            }
            return{
                "msg":"no se pudo registrar el libro"
            }
        }else{
            return({"msg":"no tiene autorizacion"})
        }
    }

    public async index(){
        const books = await Book.query();
        return books
    }
//falta, undefined retornado por request.param('id') consulatar
    public async show({/*request,*/params}: HttpContextContract){
        
        try{
            
            const id = params.id;
            console.log(id)
            const book = await Book.find(id);
            //const book = await Book.find(request.param('id'));    
            if(book){
                return book;
            }else{
                return("registro no existe")
            }
        }catch(error){
            console.log(error)
        }
    }

    public async update({request, params}: HttpContextContract){
        const sesion = process.env.SESSION
        if(sesion == "1" || sesion == "2"){
            const book = await Book.find(params.id);
            if(book){
                book.titulo = request.input("titulo");
                book.autor = request.input("autor");
                book.editorial = request.input("editorial");
                book.formato = request.input("formato");
                book.paginas = request.input("paginas");
                book.num_documento_usuario = request.input("num_documento_usuario");
                if (await book.save()){
                    return {
                        "msg": "actualizado correctamente",
                        book
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

    public async delete({request}: HttpContextContract){
        const sesion = process.env.SESSION
        if(sesion == "1" || sesion == "2"){
            try{
                const id = request.param('id');
                await Book.query().where('id', id).delete();
                return("registro eliminado"); 
            }catch(error){
                console.log(error);
                return({"msg":"no es posoible eliminarlo, puede que no exista en db"})
            }
        }else{
           return ({"msg":"No tiene permiso para esta accion"})   
        }
    }

}
