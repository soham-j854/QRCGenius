import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Scale, AlertTriangle, FileText, Ban } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/">
                        <Button variant="ghost" className="mb-6 gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <header className="mb-12">
                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                Terms of Service
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Terms and conditions for using QRCGenius.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                Last updated: January 2025
                            </p>
                        </header>

                        <div className="space-y-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Scale className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-foreground mb-2">Agreement to Terms</h2>
                                            <p className="text-muted-foreground">
                                                By accessing and using QRCGenius, you agree to be bound by these Terms of Service.
                                                If you do not agree to these terms, please do not use our service.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-primary" />
                                    Service Description
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    QRCGenius provides a free, web-based QR code generation service. The service allows users to create
                                    QR codes for various purposes including URLs, text, WiFi credentials, contact information, and more.
                                </p>
                                <p className="text-muted-foreground">
                                    The service is provided "as is" without warranties of any kind, either express or implied. We do not
                                    guarantee that the service will be uninterrupted, timely, secure, or error-free.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Ban className="w-6 h-6 text-primary" />
                                    Acceptable Use
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    You agree to use QRCGenius only for lawful purposes. You may not use the service to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li>Create QR codes that link to illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable content</li>
                                    <li>Create QR codes for phishing, malware distribution, or other malicious purposes</li>
                                    <li>Violate any local, state, national, or international law</li>
                                    <li>Infringe upon or violate intellectual property rights or privacy rights of others</li>
                                    <li>Transmit any material that contains viruses, trojan horses, worms, or other harmful components</li>
                                    <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
                                    <li>Attempt to gain unauthorized access to any portion of the service</li>
                                </ul>
                                <p className="text-muted-foreground">
                                    We reserve the right to investigate and take appropriate legal action against anyone who violates
                                    these terms, including removing content and terminating access to the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                                <p className="text-muted-foreground mb-4">
                                    <strong>Your Content:</strong> QR codes you generate using QRCGenius are yours to use freely.
                                    You retain all rights to the content you encode in your QR codes.
                                </p>
                                <p className="text-muted-foreground mb-4">
                                    <strong>Our Content:</strong> The QRCGenius brand, logo, website design, and source code remain
                                    our intellectual property. You may not copy, modify, distribute, or reverse engineer any part of
                                    our service without explicit permission.
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Open Source:</strong> Portions of QRCGenius may use open-source libraries and components,
                                    which are subject to their respective licenses.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
                                <p className="text-muted-foreground mb-4">
                                    You are solely responsible for:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>The content you encode in QR codes</li>
                                    <li>Ensuring your QR codes comply with applicable laws and regulations</li>
                                    <li>Testing QR codes before deployment to ensure they function as intended</li>
                                    <li>Maintaining appropriate error correction levels for your use case</li>
                                    <li>Backing up any QR codes you wish to keep (we do not store your QR codes)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-6 h-6 text-primary" />
                                    Limitation of Liability
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    To the maximum extent permitted by law, QRCGenius and its operators shall not be liable for any
                                    indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                                    whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses
                                    resulting from:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li>Your use or inability to use the service</li>
                                    <li>Any QR codes generated through the service</li>
                                    <li>Unauthorized access to or alteration of your transmissions or data</li>
                                    <li>Any other matter related to the service</li>
                                </ul>
                                <p className="text-muted-foreground">
                                    We make no guarantees about the scannability, functionality, or longevity of generated QR codes.
                                    You should always test QR codes before using them in production or printed materials.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer of Warranties</h2>
                                <p className="text-muted-foreground">
                                    QRCGenius is provided "as is" and "as available" without any warranties of any kind, either express
                                    or implied, including but not limited to warranties of merchantability, fitness for a particular purpose,
                                    or non-infringement. We do not warrant that the service will be uninterrupted, secure, or error-free.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                                <p className="text-muted-foreground">
                                    QRCGenius may contain links to third-party websites or services that are not owned or controlled by us.
                                    We have no control over, and assume no responsibility for, the content, privacy policies, or practices
                                    of any third-party websites or services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to modify these Terms of Service at any time. We will notify users of material
                                    changes by updating the "Last updated" date at the top of this page. Your continued use of QRCGenius
                                    after any changes constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to terminate or suspend access to our service immediately, without prior notice
                                    or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
                                <p className="text-muted-foreground">
                                    These Terms shall be governed and construed in accordance with applicable laws, without regard to its
                                    conflict of law provisions. Any disputes arising from these terms or your use of the service shall be
                                    resolved in accordance with applicable jurisdiction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                                <p className="text-muted-foreground mb-4">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <Card className="bg-primary/5 border-primary/20">
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground">
                                            <strong className="text-foreground">Email:</strong>{" "}
                                            <a href="mailto:sohamj@zohomail.in" className="text-primary hover:underline">
                                                sohamj@zohomail.in
                                            </a>
                                        </p>
                                    </CardContent>
                                </Card>
                            </section>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
