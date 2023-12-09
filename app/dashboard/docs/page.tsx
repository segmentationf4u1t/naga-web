'use client'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Endpoints } from "@/conf/cfg";
import { Terminal } from "lucide-react";
{/* @ts-ignore */ }
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
{/* @ts-ignore */ }
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {pythonCodes, javascriptCodes} from "./codes";
import Link from "next/link";
const Docs = () => {
    const OAI_PATH_VARS = ["OPENAI_API_KEY", "OPENAI_API_BASE"]
    const R_Links = ["https://api.naga.ac/docs", "https://platform.openai.com/docs/introduction", "https://developer.mozilla.org/en-US/", "https://www.freecodecamp.org/news/python-fundamentals-for-data-science/"]
    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Attention required!</AlertTitle>
                        <AlertDescription>
                            Those docs are evolving and are not complete yet. Be warned that they might change, vary and be incomplete.
                        </AlertDescription>
                    </Alert>
                    <h3 className="my-4 scroll-m-20 text-3xl font-semibold tracking-tight">
                        Understanding the Flexibility of Systems with Naga API
                    </h3>
                    <p className="text-muted-foreground">The inherent beauty of systems lies in their volatility and adaptability. They offer a remarkable degree of maneuverability and freedom, enabling changes to be made seamlessly at any point.</p>
                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Rapid Implementation with Naga API
                    </h3>
                    <p className="text-muted-foreground">When you engage with the Naga API, the goal is straightforward: to swiftly integrate our API into your applications or local tools. This process is designed for efficiency and ease of use.</p>
                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Example Use Case: Running PR Agent Locally
                    </h3>
                    <p className="text-muted-foreground">Consider the scenario where you wish to run a local instance of PR Agent. The standard documentation indicates the necessity of an OpenAI API key. While this is accurate, the structure of these systems allows for a more direct approach. You can utilize the Naga API without modifying any existing code.</p>
                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Leveraging Official OpenAI Packages
                    </h3>
                    <p className="text-muted-foreground">The official OpenAI packages available on PyPI utilize PATH variables such as </p>

                    <div className="my-4 bg-neutral-900 p-4 rounded-xl">
                        {OAI_PATH_VARS.map((v, i) => (
                            <div key={i}>
                                <span className="text-rose-500">{v}</span>
                            </div>
                        )
                        )}

                    </div>
                    <p className="text-muted-foreground">Similarly, this extends to projects developed using OpenAI&apos;s packages. Consider it like this: Any application that incorporates an OpenAI package can be seamlessly integrated with Naga. This flexibility is not only highly convenient but also enables the straightforward migration of existing applications that utilize OpenAI&apos;s API to Naga.</p>
                    <div className="my-4 bg-neutral-900 p-4 rounded-xl">
                        export {OAI_PATH_VARS[0]}=<span className="text-rose-500">YourNagaKeyGoesHere</span><br />
                        export {OAI_PATH_VARS[1]}=<span className="text-rose-500">{Endpoints.NAGA_BASE_URL.slice(0, -1)}</span>
                    </div>
                    <p className="text-muted-foreground">Or alternatively if you are running NT (Windows) </p>
                    <div className="my-4 bg-neutral-900 p-4 rounded-xl">
                        $env:{OAI_PATH_VARS[0]}=<span className="text-rose-500">YourNagaKeyGoesHere</span><br />
                        $env:{OAI_PATH_VARS[1]}=<span className="text-rose-500">{Endpoints.NAGA_BASE_URL.slice(0, -1)}</span>
                    </div>
                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                        You can also source these variables in your shell startup files
                    </h3>
                    Unix only!
                    <div className="my-4 bg-neutral-900 p-4 rounded-xl">
                        <span className="text-rose-500">curl</span> https://raw.githubusercontent.com/segmentationf4u1t/NagaWeb/main/sourcemeUnix.txt <span className="text-rose-500">{'>>'}</span> ~/.bashrc
                    </div>
                    <p className="text-muted-foreground">This script will append the path variables to your shell startup file. You can then replace the values with your Naga API key and Naga API base URL.
                    </p>
                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Example Codes & Implementations
                    </h3>

                    <p className="text-muted-foreground">
                        On the right side of this webpage, you&apos;ll find sample code for Python and JavaScript. While similar in implementation, they differ in syntax, reflecting the architectural distinctions between the two languages. While not exhaustive, these examples serve as a solid starting point for using both OpenAI and NagaAI APIs.
                    </p>
                    <p className="text-muted-foreground py-2">
                        For other references, parameters, and endpoints please visit those resources:

                    </p>
                    <ul className="text-muted-foreground">
                        {R_Links.map((v, i) => (
                            <li key={i}>
                                <Link href={v}>
                                    <p className="text-rose-500">{v}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="px-4">
                    <Tabs defaultValue="python" className="">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="python">Python</TabsTrigger>
                            <TabsTrigger value="javascript">Javascript</TabsTrigger>
                        </TabsList>
                        <TabsContent value="python">
                            {Object.entries(pythonCodes).map(([key, value]) => (
                                <div key={key}>
                                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {value.title}
                                    </h3>
                                    <SyntaxHighlighter language="python" style={atomDark}>
                                        {value.code}
                                    </SyntaxHighlighter>
                                </div>
                            )
                            )}

                        </TabsContent>
                        <TabsContent value="javascript">
                        {Object.entries(javascriptCodes).map(([key, value]) => (
                                <div key={key}>
                                    <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {value.title}
                                    </h3>
                                    <SyntaxHighlighter language="python" style={atomDark}>
                                        {value.code}
                                    </SyntaxHighlighter>
                                </div>
                            )
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
export default Docs