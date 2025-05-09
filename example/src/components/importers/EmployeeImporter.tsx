import { useState } from 'preact/hooks';
import Importer, { ImporterState } from 'hello-csv/peer';
import example1 from '../../assets/datasets/example-1.csv?url';

export default function EmployeeImporter() {
  const [ready, setReady] = useState(false);

  const onComplete = async (
    data: ImporterState,
    onProgress: (progress: number) => void
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(20);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(50);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(100);
    console.log(data);
    setReady(true);
  };
  return (
    <div className="content">
      <a id="basic-example"></a>
      <div className="documentation-container">
        <h3 className="font-title">
          Basic Example
        </h3>
        <div className="container leading-8">
          <p>
            Imagine we are trying to set up an uploader that uploads a CSV of <code className="bg-gray-200 p-1 rounded-md">employees</code>.
          </p>
          <p>
            HelloCSV makes this a breeze.
          </p>
        </div>
        <p className="mt-8 text-lg underline decoration-blue-500 underline-offset-6 decoration-4">
          Try uploading{' '}
          <a className="text-blue-500 hover:text-blue-600" href={example1}>
            this file
          </a>
          .
        </p>
      </div>
      <div className="mt-4 flex max-h-[800px] rounded-lg border border-gray-200 bg-white p-6 px-8">
        <Importer
          maxFileSizeInBytes={10 * 1024 * 1024} // 10MB
          sheets={[
            {
              id: 'employees',
              label: 'Employees',
              columns: [
                {
                  label: 'Employee ID',
                  id: 'employee.id',
                  type: 'number',
                  validators: [
                    { validate: 'required' },
                    {
                      validate: 'unique',
                      error: 'This employee ID is not unique',
                    },
                    {
                      validate: 'is_integer',
                      error: 'This value must be a number',
                    },
                  ],
                },
                {
                  label: 'Email',
                  id: 'email',
                  type: 'string',
                  validators: [
                    { validate: 'required' },
                    { validate: 'unique', error: 'This email is not unique' },
                    {
                      validate: 'email',
                      error: 'This email is not valid',
                    },
                  ],
                },
                {
                  label: 'Phone Number',
                  id: 'phone_number',
                  type: 'string',
                  validators: [
                    { validate: 'required' },
                    { validate: 'phone_number' },
                  ],
                },
                {
                  label: 'Address',
                  id: 'address',
                  type: 'string',
                  validators: [{ validate: 'required' }],
                },
                { label: 'City', id: 'city', type: 'string' },
                {
                  label: 'State',
                  id: 'state',
                  type: 'string',
                  transformers: [{ transformer: 'state_code' }],
                },
                {
                  label: 'Zip Code',
                  id: 'zip_code',
                  type: 'string',
                  validators: [
                    { validate: 'required' },
                    { validate: 'postal_code' },
                  ],
                },
                {
                  label: 'Full address',
                  id: 'full_address',
                  type: 'calculated',
                  typeArguments: {
                    getValue: (row) =>
                      `${row.address}, ${row.city}, ${row.state} ${row.zip_code}`,
                  },
                },
              ],
            },
          ]}
          onDataColumnsMapped={(dataColumns) => {
            return dataColumns;
          }}
          onComplete={onComplete}
          preventUploadOnValidationErrors
        />
      </div>
      {ready && (
        <div>
          <h4>Check the console for the output!</h4>
        </div>
      )}
    </div>
  );
}
