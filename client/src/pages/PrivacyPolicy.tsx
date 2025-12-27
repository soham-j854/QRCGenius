import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Cookie, Database, Eye, Lock } from "lucide-react";

export default function PrivacyPolicy() {
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
                                Privacy Policy
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                How QRCGenius handles your data and protects your privacy.
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
                                            <Shield className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-foreground mb-2">Our Commitment</h2>
                                            <p className="text-muted-foreground">
                                                QRCGenius is committed to protecting your privacy. This policy explains what data we collect,
                                                how we use it, and your rights regarding your information.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Database className="w-6 h-6 text-primary" />
                                    Data Collection
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    <strong>QRCGenius does not collect, store, or process any personal data.</strong> All QR code
                                    generation happens entirely in your browser (client-side). We have no access to the content you encode
                                    in your QR codes.
                                </p>
                                <p className="text-muted-foreground">
                                    We do not require registration, sign-ups, or any form of user account creation. You can use our
                                    service completely anonymously.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Lock className="w-6 h-6 text-primary" />
                                    Local Storage
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Your recent QR codes are stored locally in your browser using LocalStorage. This data:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li>Never leaves your device</li>
                                    <li>Is not transmitted to any server</li>
                                    <li>Can be cleared at any time through your browser settings</li>
                                    <li>Can be deleted using the delete buttons in the app interface</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Cookie className="w-6 h-6 text-primary" />
                                    Cookies & Tracking
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    <strong>Essential Cookies:</strong> QRCGenius uses minimal essential cookies only for:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li>Storing your theme preference (dark/light mode)</li>
                                    <li>Maintaining your QR code history in LocalStorage</li>
                                </ul>
                                <p className="text-muted-foreground mb-4">
                                    <strong>Third-Party Services:</strong> We may use third-party services for:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li><strong>Google AdSense:</strong> We may display advertisements through Google AdSense. Google uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Ads Settings</a>.</li>
                                    <li><strong>Analytics:</strong> We may use analytics services to understand how users interact with our site. These services may use cookies and similar technologies.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-primary" />
                                    Third-Party Advertising
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    We use Google AdSense to display advertisements. Google and its partners may use cookies and other
                                    technologies to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                                    <li>Serve ads based on your visits to this site and other sites on the Internet</li>
                                    <li>Measure ad effectiveness</li>
                                    <li>Provide personalized advertising</li>
                                </ul>
                                <p className="text-muted-foreground mb-4">
                                    You can manage your ad preferences and opt out of personalized advertising at:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a></li>
                                    <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a></li>
                                    <li><a href="https://youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">European Interactive Digital Advertising Alliance (EU users)</a></li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">GDPR Compliance</h2>
                                <p className="text-muted-foreground mb-4">
                                    Since we don't collect personal data directly, QRCGenius is compliant with GDPR and other privacy
                                    regulations. However, third-party services (like Google AdSense) may collect data subject to their
                                    own privacy policies.
                                </p>
                                <p className="text-muted-foreground">
                                    If you are located in the European Economic Area (EEA), you have rights under GDPR including the
                                    right to access, rectify, or erase data held by third parties. Please contact those services directly
                                    to exercise these rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
                                <p className="text-muted-foreground">
                                    QRCGenius does not knowingly collect information from children under 13. Our service is available to
                                    all ages, but we do not target or market to children.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
                                <p className="text-muted-foreground">
                                    We may update this Privacy Policy from time to time. We will notify users of any material changes by
                                    updating the "Last updated" date at the top of this policy. Continued use of QRCGenius after changes
                                    constitutes acceptance of the updated policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                                <p className="text-muted-foreground mb-4">
                                    If you have questions or concerns about this Privacy Policy, please contact us:
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
