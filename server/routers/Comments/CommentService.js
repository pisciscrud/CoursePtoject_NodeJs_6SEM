const CommentRepository = require("./CommentRepository")


class CommentService
{
    constructor()
    {
        this.commentRepository = new CommentRepository();
    }


    async getAllComments()
    {
        try
        {
            return this.commentRepository.findAll();
        }
        catch(e)
        {

        }
    }

    async addComment(date_, rating, content, user_id, master_id, procedure_id)
    {
        try
        {
            return this.commentRepository.createComment(date_, rating, content, user_id, master_id, procedure_id)
        }
        catch(e)
        {
         console.log('ecececefc')
        }
    }


}
 module.exports = CommentService;