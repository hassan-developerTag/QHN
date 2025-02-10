import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Database,
  Brain,
  Menu,
  X,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  ChevronRight,
  Globe,
  Users
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 bg-gradient-to-b from-green-50 via-white to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 mb-6 gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Now accepting new healthcare partners
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Healthcare Data Management
              {/* <span className="text-green-600"> Blockchain</span> */}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Secure, efficient, and revolutionary health data management platform that puts you in control
              while contributing to medical research.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 group">
                  Join as Patient
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                  Join as Partner
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                End-to-End Encrypted
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                ISO 27001 Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">100K+</div>
              <div className="text-sm text-gray-600 mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50M+</div>
              <div className="text-sm text-gray-600 mt-1">Records Secured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-gray-600 mt-1">Research Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600 mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Revolutionary Healthcare Data Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare data management with our comprehensive platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UserCheck className="h-8 w-8 text-white" />,
                title: "Secure KYC Verification",
                description: "Quick and secure identity verification process for all users",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Database className="h-8 w-8 text-white" />,
                title: "Health Data Management",
                description: "Store and manage your health records with military-grade encryption",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Shield className="h-8 w-8 text-white" />,
                title: "Privacy First",
                description: "End-to-end encryption and blockchain technology for maximum security",
                color: "from-purple-500 to-purple-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} mb-4 
                    flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm 
                text-green-700 mb-6">For Healthcare Partners</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Accelerate Medical Research
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Access anonymized health data for research while ensuring patient privacy
                and regulatory compliance.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: <Globe className="h-6 w-6 text-green-600" />,
                    title: "Global Data Access",
                    description: "Access to worldwide health records"
                  },
                  {
                    icon: <Brain className="h-6 w-6 text-green-600" />,
                    title: "AI Analytics",
                    description: "Advanced tools for data analysis"
                  },
                  {
                    icon: <Users className="h-6 w-6 text-green-600" />,
                    title: "Research Collaboration",
                    description: "Connect with researchers globally"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button className="bg-green-600 hover:bg-green-700 group">
                  Join as Partner
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-xl p-8 relative">
                <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                  Featured
                </div>
                <h3 className="text-xl font-semibold mb-6">Partner Benefits</h3>
                {[
                  "HIPAA Compliant Data Access",
                  "Real-time Analytics Dashboard",
                  "Secure Data Transfer Protocols",
                  "24/7 Technical Support",
                  "Custom Research Tools",
                  "Collaboration Networks"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home