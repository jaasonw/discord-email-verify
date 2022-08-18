# acm-registration

A Discord server registration service. Completely deployed on a serverless architecture. 

## Features

### Modern Discord Interactions

![image 2](https://user-images.githubusercontent.com/8981287/185510392-ddfa158c-a7d8-478b-bf58-6f5970358ec6.png)


Slash Commands

![image 1](https://user-images.githubusercontent.com/8981287/185510406-782de589-5878-4198-b5cc-a722e415b3cb.png)

Modals

### Streamline, no BS verification process

![image 3](https://user-images.githubusercontent.com/8981287/185510418-7de94b94-f359-4083-9f4d-575cc965f595.png)


![image 4](https://user-images.githubusercontent.com/8981287/185510421-e8f54e95-7872-4c88-a2a1-45abedd2899f.png)


Simply register with 1 command and we’ll generate a 1-click, single-use verification link. We’ll handle the rest, role assignment, nickname assignment, database storage

### Self hostable with minimal configuration

Just link your repository your cloud provider of choice with Next.js support, fill in some environment variables for your Discord token, database, etc, and you’re good to go!

### Built on a serverless architecture

No more having to create and share SSH keys to maintain the server

No scripts or services to auto run your bot

Simply deploy and your cloud provider handles the rest

### Bring your own database

We use Prisma under the hood for our database queries, so long as [Prisma supports it](https://www.prisma.io/docs/reference/database-reference/supported-databases), we support it
