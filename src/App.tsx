import { useState } from 'react';
import FlashcardDeck from './components/FlashcardDeck';
import CSVUploader from './components/CSVUploader';
import type { FlashcardData } from './utils/csvParser';
import './App.css';

// Default AWS IAM flashcards from your CSV
const defaultFlashcards: FlashcardData[] = [
  { question: "What are the three ways to access AWS services?", answer: "The AWS Management Console (web interface), the AWS CLI (Command Line Interface), and the AWS SDK (Software Development Kit)." },
  { question: "How is access to the AWS Management Console typically protected?", answer: "It is protected by a username, password, and optionally, Multi-Factor Authentication (MFA)." },
  { question: "What type of credentials are used to protect access via the AWS CLI and AWS SDK?", answer: "They are protected by access keys." },
  { question: "What are the two components of an AWS access key pair?", answer: "An Access Key ID and a Secret Access Key." },
  { question: "In the context of AWS access keys, the Access Key ID is analogous to a _____, while the Secret Access Key is analogous to a _____.", answer: "username; password" },
  { question: "What is the AWS Command Line Interface (CLI)?", answer: "A tool that allows you to interact with AWS services using commands from a command-line shell." },
  { question: "What is the primary purpose of the AWS Software Development Kit (SDK)?", answer: "To allow you to access and manage AWS services and APIs programmatically from within your application code." },
  { question: "The AWS CLI is built on which specific SDK?", answer: "The AWS SDK for Python, which is named Boto." },
  { question: "According to best practices, what should you do with your AWS access keys?", answer: "Treat them as secret, just like a password, and never share them with anyone." },
  { question: "Where in the AWS Management Console can an IAM user generate their own access keys?", answer: "By navigating to their user name in the top navigation bar and selecting 'Security credentials'." },
  { question: "When creating an access key in the AWS Console for the CLI, what are the two alternatives AWS recommends instead of using long-term credentials?", answer: "AWS CloudShell (a browser-based CLI) and using the AWS CLI V2 with authentication through IAM Identity Center." },
  { question: "What is the critical security warning provided when you create a new access key pair in the AWS console?", answer: "It is the only time you can view or download the secret access key; if you lose it, you must create a new one." },
  { question: "Which command is used to configure the AWS CLI with your credentials and default settings?", answer: "aws configure" },
  { question: "What four pieces of information does the `aws configure` command prompt you for?", answer: "AWS Access Key ID, AWS Secret Access Key, Default region name, and Default output format." },
  { question: "What command can be used to verify that the AWS CLI is installed correctly and to check its version?", answer: "aws --version" },
  { question: "How does the AWS CLI demonstrate that its permissions are identical to those in the IAM console?", answer: "If an IAM user's permissions are removed, both the console and a CLI command (like `aws iam list-users`) will fail with an access denied error." },
  { question: "What is the recommended method for installing the AWS CLI v2 on a Windows machine?", answer: "Using the graphical MSI installer provided in the official AWS documentation." },
  { question: "What is the recommended method for installing the AWS CLI v2 on macOS?", answer: "Using the provided .pkg graphical installer from the AWS documentation." },
  { question: "What are the three main commands used to install the AWS CLI v2 on a Linux machine?", answer: "`curl` to download the zip file, `unzip` to extract it, and `sudo ./aws/install` to run the installer." },
  { question: "What is AWS CloudShell?", answer: "A free, browser-based terminal directly within the AWS cloud that comes with the AWS CLI pre-installed." },
  { question: "What is the key advantage of CloudShell regarding authentication?", answer: "It automatically uses the credentials of the user currently logged into the AWS Management Console, requiring no manual configuration." },
  { question: "What happens to files created in your AWS CloudShell home directory?", answer: "They are persistent, meaning they will still be there if you restart your CloudShell session." },
  { question: "How can you move files from your local machine to the AWS CloudShell environment?", answer: "By using the 'Upload file' option in the 'Actions' menu within CloudShell." },
  { question: "What is a major limitation regarding the availability of AWS CloudShell?", answer: "It is not available in all AWS regions." },
  { question: "What is the fundamental IAM best practice regarding the root account?", answer: "You should not use your root account for daily tasks; only use it for the initial setup of your AWS account." },
  { question: "What is the recommended mapping between physical users and AWS IAM users?", answer: "One physical user should equal one AWS user; credentials should not be shared." },
  { question: "What are IAM Policies?", answer: "JSON documents that define permissions for an IAM identity (user, group, or role)." },
  { question: "According to IAM best practices, what should you create and use when granting permissions to AWS services like EC2 instances?", answer: "You should create and use IAM Roles." },
  { question: "What two tools can be used to audit the permissions of your AWS account?", answer: "The IAM Credentials Report and the IAM Access Advisor feature." },
  { question: "What is an 'inline policy' in IAM?", answer: "A policy that is attached only to a single, specific user rather than to a group." },
  { question: "If a user belongs to two different groups, what permissions do they have?", answer: "The user inherits the combined permissions from the policies attached to both groups." },
  { question: "In an IAM policy JSON document, what does the 'Effect' element specify?", answer: "It specifies whether the statement results in an 'Allow' or a 'Deny'." },
  { question: "In an IAM policy JSON document, what does the 'Action' element define?", answer: "It defines the list of API calls that will be allowed or denied by the policy." },
  { question: "In an IAM policy JSON document, what does the 'Resource' element specify?", answer: "It specifies the list of resources to which the actions defined in the policy apply." },
  { question: "In an IAM policy, what does the 'Principal' element identify?", answer: "The account, user, role, or federated user to which the policy is applied." },
  { question: "What is the purpose of the optional 'Condition' element in an IAM policy?", answer: "It allows you to add extra rules to control access, such as restricting by IP address or enforcing MFA." },
  { question: "What does the wildcard character `*` signify when used in the 'Action' or 'Resource' element of an IAM policy?", answer: "It means 'anything' or 'all', granting permission for all actions or on all resources." },
  { question: "If an IAM user has the `IAMReadOnlyAccess` policy attached, what will happen if they try to create a new user group?", answer: "The action will fail with an 'Access Denied' error because the policy only allows read operations, not write operations like creating a group." },
  { question: "A user's total permissions are the combination of policies attached _____ and policies inherited from all _____ they belong to.", answer: "directly; groups" },
  { question: "What is the purpose of an IAM Role?", answer: "To grant permissions to AWS services, allowing them to perform actions on your behalf without needing long-term credentials." },
  { question: "What is a common use case for an IAM Role?", answer: "Assigning it to an EC2 instance so the instance can securely access other AWS services, like S3 buckets." },
  { question: "What is an IAM Credentials Report?", answer: "An account-level report that lists all your account's users and the status of their various credentials, like passwords, access keys, and MFA." },
  { question: "What information does the IAM Access Advisor provide?", answer: "It shows the service permissions granted to a user and when those services were last accessed." },
  { question: "How does the IAM Access Advisor help enforce the principle of least privilege?", answer: "It helps identify unused permissions that can be safely removed from a user's policy, reducing their access to only what is necessary." },
  { question: "Within the Shared Responsibility Model for IAM, who is responsible for creating and managing users, groups, roles, and policies?", answer: "The customer is responsible." },
  { question: "According to the Shared Responsibility Model, who is responsible for enabling and enforcing MFA on accounts?", answer: "The customer is responsible." },
  { question: "In the Shared Responsibility Model, what is AWS responsible for regarding their infrastructure?", answer: "AWS is responsible for the security *of* the cloud, including their global network infrastructure, service configurations, and compliance validation." },
  { question: "What is a password policy in AWS IAM?", answer: "A set of rules you can configure to enforce strong password standards for all IAM users in your account." },
  { question: "Name three requirements you can enforce with an IAM password policy.", answer: "Minimum password length, specific character types (uppercase, lowercase, numbers, non-alphanumeric), and password expiration." },
  { question: "What is Multi-Factor Authentication (MFA)?", answer: "A security layer that requires users to provide a password (something they know) and a code from a security device (something they own)." },
  { question: "Why is it highly recommended to enable MFA on the AWS root account?", answer: "To provide an extra layer of security, as the root account has unlimited access to all resources in the account." },
  { question: "What is a 'virtual MFA device' in AWS?", answer: "An application on a phone or computer, like Google Authenticator or Authy, that generates time-based, one-time passwords." },
  { question: "What is a 'Universal 2nd Factor (U2F) Security Key' for AWS MFA?", answer: "A physical device, like a YubiKey, that you plug into a USB port to authenticate." },
  { question: "When setting up a virtual MFA device, why does AWS require you to enter two consecutive MFA codes?", answer: "To verify that the device is set up correctly and that the time-based codes it generates are synchronized and accurate." },
  { question: "What is the policy that provides full access to all AWS services and resources?", answer: "The `AdministratorAccess` policy." },
  { question: "What is the effect of attaching the `IAMReadOnlyAccess` policy to a user?", answer: "The user can view information within IAM but cannot make any changes, such as creating users or modifying policies." },
  { question: "How can you create a custom IAM policy in the AWS console?", answer: "By navigating to Policies, clicking 'Create policy', and using either the Visual editor or the JSON editor to define permissions." },
  { question: "After configuring the AWS CLI with `aws configure`, what command can you run to test if it can communicate with the IAM service?", answer: "`aws iam list-users`" },
  { question: "When a new access key is created, the Secret Access Key is only shown once. If it is lost, what must you do?", answer: "You must create a new access key and make the old key inactive." }
];

function App() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>(defaultFlashcards);
  const [showUploader, setShowUploader] = useState(false);

  const handleUpload = (newFlashcards: FlashcardData[]) => {
    setFlashcards(newFlashcards);
    setShowUploader(false);
  };

  const handleReset = () => {
    setShowUploader(true);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
              <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">Study Smart</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Flashcard Study Deck
            </span>
          </h1>
          <p className="text-2xl text-white/80 font-light max-w-2xl mx-auto">
            Master your knowledge, one card at a time ✨
          </p>
        </div>

        {/* Main Content */}
        {showUploader ? (
          <div className="flex flex-col items-center gap-8">
            <CSVUploader onUpload={handleUpload} />
            <button
              onClick={() => setShowUploader(false)}
              className="group flex items-center gap-2 text-white/90 hover:text-white font-medium transition-all duration-200 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>or use default AWS IAM deck</span>
            </button>
          </div>
        ) : (
          <FlashcardDeck flashcards={flashcards} onReset={handleReset} />
        )}

        {/* Footer Info */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
            <p className="text-white/80 text-sm font-medium mb-2">Built with modern technologies</p>
            <div className="flex items-center justify-center gap-4 text-white/60 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                React
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                TypeScript
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
