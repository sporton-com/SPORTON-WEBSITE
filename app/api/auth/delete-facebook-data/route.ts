// pages/api/auth/delete-facebook-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (session) {
        const email = session.user?.email;

        // هنا قم بتنفيذ منطق حذف بيانات المستخدم من قاعدة البيانات
        // await deleteUserData(userId);

        res.status(200).json({ message: 'User data deleted successfully.' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
