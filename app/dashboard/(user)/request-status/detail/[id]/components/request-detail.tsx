import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaDotCircle, FaFilePdf } from "react-icons/fa";
import ChatMessage from "./chat-message";

const messages = [
  {
    avatar: "https://i.pravatar.cc/150?img=1", // Example avatar image URL
    message: "Yes. Should we move it to next week?",
    timestamp: "14:28",
    isUser: false,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    message: "Sure, whatever suits you. I'm free whenever.",
    timestamp: "14:29",
    isUser: true,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    message: "And I'll update the calendar. I thought I already updated it.",
    timestamp: "14:30",
    isUser: false,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    message: "It's all good fam.",
    timestamp: "14:31",
    isUser: true,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    message: "I rescheduled it to every first Wednesday in the month. But we can do it next week whenever you want?",
    timestamp: "14:32",
    isUser: false,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    message: "Cool bro. ✌️ Next Thursday at about 13:00?",
    timestamp: "14:33",
    isUser: true,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    message: "Ok, I'll let you know.",
    timestamp: "14:34",
    isUser: false,
  },
];

const DetailRequest = () => {
  return (
    <>
      <div className="bg-white">
        <div className="p-6">
          <div className="space-y-2 pb-6">
            <h2 className="font-semibold text-lg leading-7">Detail Status of Request</h2>
            <p className="text-sm">
              View and manage your invoices with ease. Track payment statuses, review details, and stay updated on your billing history, all in one place.
            </p>
          </div>

          <div className="flex flex-row gap-6 pb-8">
            <div className="w-1/2 space-y-2">
              <h3 className="font-semibold text-md">Profile Information</h3>
              <p>Name of Applicant: Oji Otot</p>
              <p>Email: visto@gmail.com</p>
              <p>Phone Number: +62 857-3456-7890</p>
              <p>Address: Gedung Artha Graha, Jl. Jenderal Sudirman No.52-53, RT.5/RW.3, Senayan, Kebayoran Baru, South Jakarta City, Jakarta 12190</p>
            </div>

            <div className="w-1/2 space-y-2">
              <h3 className="font-semibold text-md">Package Information</h3>
              <p>Package: Package 2</p>
              <p>
                Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem excepturi, ea sint eveniet consequatur sit, odit velit nisi
                voluptates quis perferendis, eos autem vero quo laborum officia? Qui, impedit facilis!
              </p>
              <h3 className="font-semibold text-md">Bonus Package:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Business License</span>
                </div>
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Tax System</span>
                </div>
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Company Profile</span>
                </div>
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Free Company Website</span>
                </div>
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Free Absent System</span>
                </div>
                <div className="flex items-center">
                  <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                  <span className="text-base text-zinc-400">Free ERP System</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-8">
            <h3 className="font-semibold text-md">Documents:</h3>
            <div className="flex justify-between">
              <div className="flex items-center">
                <FaFilePdf className="size-4 mr-2 text-zinc-400" />
                <span className="text-base text-zinc-400">KTP</span>
              </div>
              <div className="flex items-center">
                <FaFilePdf className="size-4 mr-2 text-zinc-400" />
                <span className="text-base text-zinc-400">KK</span>
              </div>
              <div className="flex items-center">
                <FaFilePdf className="size-4 mr-2 text-zinc-400" />
                <span className="text-base text-zinc-400">NPWP</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <Table className="border border-zinc-200">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>Name of Company</TableHead>
                <TableHead>Company Address</TableHead>
                <TableHead>KBLI Code</TableHead>
                <TableHead>Company Phone Number</TableHead>
                <TableHead>Fax Number of Company</TableHead>
                <TableHead>Company Authorized Capital</TableHead>
                <TableHead>Company's Paid-up Capital</TableHead>
                <TableHead>Company Executives</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
                <TableCell className="border border-zinc-200">otot 1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div className="mt-8 rounded-lg bg-white shadow-md relative">
          {/* Chat Messages */}
          <div className="p-5 space-y-4 overflow-y-auto max-h-80">
            {messages.map((msg, index) => (
              <ChatMessage key={index} avatar={msg.avatar} message={msg.message} timestamp={msg.timestamp} isUser={msg.isUser} />
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <input
              type="text"
              className="rounded-lg w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type a message..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRequest;
