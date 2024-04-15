import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
    const hashpassword = await bcrypt.hash('12345678', 10)
    await prisma.user.create({
        data: {
            email: 'thiago@email.com',
            password: hashpassword,
            name: 'Thiago',
        }
    })
    const user = await prisma.user.findFirst({
        where:{
            email: 'thiago@email.com'
        }
    })
    if(user){
    const transactions = [
        {
            description:'Salario',
            amount:150000,
            userId:user.id,
            operation:'POSITIVE',
            date:'2024-03-05'
        },
        {
            description:'Salario',
            amount:150000,
            userId:user.id,
            operation:'POSITIVE',
            date:'2024-02-05'
        },
        {
            description:'Tenis novo',
            amount:32000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-10'
        },
        {
            description:'Cinema',
            amount:10000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-10'
        },
        {
            description:'Academia',
            amount:15000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-15'
        },
        {
            description:'Academia',
            amount:15000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-15'
        },
        {
            description:'Viagem carnaval',
            amount:55000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-13'
        },
        {
            description:'Farmacia',
            amount:22000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-15'
        },
        {
            description:'Acai',
            amount:2500,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-24'
        },
        {
            description:'Ovos de pascoa',
            amount:25000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-31'
        },
        {
            description:'Uber',
            amount:3300,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-31'
        },
        {
            description:'Uber',
            amount:2500,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-02'
        },
        {
            description:'Uber',
            amount:2900,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-02'
        },
        {
            description:'Uber',
            amount:2500,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-04-24'
        },
        {
            description:'Churros',
            amount:1200,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-04-12'
        },

        {
            description:'Salario',
            amount:150000,
            userId:user.id,
            operation:'POSITIVE',
            date:'2024-04-05'
        },
        {
            description:'Academia',
            amount:15000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-04-15'
        },
        {
            description:'Aniversario mãe',
            amount:30000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-04-18'
        },
        {
            description:'Air Fryer',
            amount:50000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-10'
        },
        {
            description:'Ifood',
            amount:15000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-02-05'
        },
        {
            description:'Ifood',
            amount:8000,
            userId:user.id,
            operation:'NEGATIVE',
            date:'2024-03-24'
        },
    ]
    await prisma.transaction.createMany({
        data:transactions
    })}

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

