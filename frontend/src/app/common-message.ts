/**
 * This is the common message class.
 * @author Sohan
 * @version 1.0
 * @since 9/1/2023
 */
export class CommonMessage{
    /**
     * This method is used to send success message after create opeartion 
     * @returns message
     */
    public static getSuccessCreate(){
        return "Record Successfully Created";
    }

    /**
     * This method is used to send success message after update opeartion 
     * @returns message
     */
    public static getSuccessUpdate(){
        return "Record Successfully Updated";
    }

    /**
     * This method is used to send success message after delete opeartion 
     * @returns message
     */
    public static getSuccessDelete(){
        return "Record Successfully Deleted!";
    }

    /**
     * This method is used to send error message if ui error occur
     * @returns message
     */
    public static getErrorSomethingNotRight(){
        return "Something wasn't right please try again !!";
    }

    /**
     * This method is used to send error message if server error occur
     * @returns message
     */
    public static getErrorSomethingWrong(){
        return "Oops, something went Wrong!!\n Please try again";
    }

    /**
     * This method is used to send warning message if record is already deleted
     * @returns message
     */
    public static getWarningAlreadyDelete(){
        return "Record already deleted!!";
    }

    /**
     * This method is used to send warning message if record is already exist
     * @returns message
     */
    public static getWarningAlreadyExist(){
        return "Record already exist!!";
    }

    /**
     *  This method is used to send success message with name after create opeartion
     * @param name - name of the event
     * @returns messagae
     */
    public static getSuccessAddByName(name:string){
        return name+' successfully added';
    }

    /**
     *  This method is used to send error message after add opeartion
     * @param name -name of the event
     * @returns message
     */
    public static getErrorAddFailedByName(name:string){
        return name+' add failed !!\n Please try again...';
    }

    /**
     *  This method is used to send error message if no data found
     * @returns message
     */
    public static getErrorNoDataAvailable(){
        return 'No data Available!!';
    }
}