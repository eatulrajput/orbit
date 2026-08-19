import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret');
        const userId = urlParams.get('userId');

        if (secret && userId) {
            try {
                await this.account.updateMagicURLSession(userId, secret);
                return await this.account.get();
            } catch (err) {
                console.log("Appwrite service :: updateMagicURLSession error", err);
            }
        }

        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async sendMagicLink(email) {
        try {
            return await this.account.createMagicURLSession(
                ID.unique(),
                email,
                `${window.location.origin}/dashboard`
            );
        } catch (error) {
            console.log("Appwrite service :: sendMagicLink :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService


