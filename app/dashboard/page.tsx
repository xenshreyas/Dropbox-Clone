import Dropzone from '@/components/dropzone';
import TableWrapper from '@/components/table/TableWrapper';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';

async function Dashboard() {
    const { userId } = auth();

    const docResults = await getDocs(collection(db, "users", userId!, "files"));
    const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName || undefined,
        downloadURL: doc.data().downloadURL || undefined,
        type: doc.data().type || undefined,
        size: doc.data().size || undefined,
    }));
  return (
    <div>
        <Dropzone />

        <section className="container space-y-5">
            <h2 className="font-bold">All Files</h2>

            <div>
                {/* Table Wrapper */}
                <TableWrapper skeletonFiles={skeletonFiles} />
            </div>
        </section>
    </div>
  )
}

export default Dashboard;