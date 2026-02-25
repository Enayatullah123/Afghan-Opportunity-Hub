import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Target, Eye, Heart, Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const valuesRaw = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We care deeply about the success and well-being of every individual we serve',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We believe opportunities should be accessible to everyone',
    },
    {
      icon: TrendingUp,
      title: 'Empowerment',
      description: 'We equip people with knowledge and tools to succeed',
    },
  ];

  const impactRaw = [
    { number: '500+', label: 'Scholarships Listed', icon: Award },
    { number: '100+', label: 'Job Opportunities', icon: Users },
    { number: '10,000+', label: 'Students Helped', icon: TrendingUp },
    { number: '50+', label: 'Partner Organizations', icon: Heart },
  ];

  const { t } = useLocale();

  const rawValues = (t('values') || valuesRaw);
  const values = rawValues.map((v, i) => ({
    icon: v.icon || valuesRaw[i]?.icon,
    title: v.title || valuesRaw[i]?.title,
    description: v.description || valuesRaw[i]?.description,
  }));

  const rawImpact = (t('impactStats') || impactRaw);
  const impactStats = rawImpact.map((s, i) => ({
    number: s.number || impactRaw[i]?.number,
    label: s.label || impactRaw[i]?.label,
    icon: s.icon || impactRaw[i]?.icon,
  }));

  return (
    <>
      <Helmet>
        <title>{t('aboutTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'About Afghan Opportunity Hub.'} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-32"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 115, 190, 0.85), rgba(30, 115, 190, 0.85)), url('https://images.unsplash.com/photo-1698678640513-ff0b0032f85a')`,
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('aboutTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              {t('aboutHeroDesc')}
            </motion.p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
                <Target className="w-16 h-16 mx-auto mb-6 text-[#1E73BE]" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('ourMission')}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('missionText') || 'Helping Afghan people access life-changing opportunities'}
                </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('aboutIntro')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Eye className="w-16 h-16 mx-auto mb-6 text-[#1E73BE]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('ourVision')}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aboutVision')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('ourValues')}</h2>
              <p className="text-lg text-gray-600">
                {t('trustDescription') || 'The principles that guide everything we do'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <value.icon className="w-16 h-16 mx-auto mb-4 text-[#1E73BE]" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* History/Background */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('ourStory')}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('aboutHistory1')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('aboutHistory2')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('aboutToday')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('ourImpact')}</h2>
              <p className="text-lg text-gray-600">
                {t('ourImpact') || 'Making a difference in the lives of thousands'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#1E73BE] to-blue-600 text-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <stat.icon className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-blue-100 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Users className="w-16 h-16 mx-auto mb-6 text-[#1E73BE]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('ourTeam')}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('aboutTeamParagraph1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aboutTeamParagraph2')}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;