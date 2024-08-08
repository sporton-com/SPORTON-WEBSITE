import { NextPage } from 'next';

const DataDeletion: NextPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Data Deletion Instructions</h1>
      <p>
        If you wish to delete your data associated with our application, please follow the steps below:
      </p>
      <ol>
        <li>
          Go to your Facebook account settings.
        </li>
        <li>
          Select "Apps and Websites" from the left-hand menu.
        </li>
        <li>
          Find our application in the list and select it.
        </li>
        <li>
          Click "Remove" to delete the app and all associated data.
        </li>
      </ol>
      <p>
        If you need further assistance or have any questions, please contact our support team at 
        <a href="mailto:support@example.com">support@example.com</a>.
      </p>
    </div>
  );
}

export default DataDeletion;
