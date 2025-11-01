import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, ExternalLink, Terminal, Database, Globe } from 'lucide-react'

const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Matrix',
      type: 'Full Stack Application',
      description: 'Advanced e-commerce platform with real-time inventory, AI recommendations, and blockchain payments.',
      longDescription: 'Built with React, Node.js, PostgreSQL, and integrated with multiple payment gateways. Features include real-time chat, advanced analytics, and microservices architecture.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      status: 'PRODUCTION',
      github: '#',
      live: '#',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      metrics: {
        users: '10K+',
        uptime: '99.9%',
        performance: '95/100'
      }
    },
    {
      id: 2,
      title: 'Neural Task Manager',
      type: 'AI-Powered SaaS',
      description: 'Intelligent project management with AI task prioritization and team collaboration features.',
      longDescription: 'Machine learning algorithms analyze team patterns to optimize workflow. Real-time collaboration with WebSocket integration and advanced reporting dashboard.',
      technologies: ['Next.js', 'Python', 'TensorFlow', 'WebSocket', 'MongoDB'],
      status: 'BETA',
      github: '#',
      live: '#',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      metrics: {
        users: '5K+',
        uptime: '98.5%',
        performance: '92/100'
      }
    },
    {
      id: 3,
      title: 'Crypto Analytics Hub',
      type: 'Data Visualization',
      description: 'Real-time cryptocurrency market analysis with advanced charting and portfolio tracking.',
      longDescription: 'Processes millions of data points in real-time using WebSocket streams. Custom charting engine built with D3.js and Canvas for optimal performance.',
      technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Node.js', 'InfluxDB'],
      status: 'DEVELOPMENT',
      github: '#',
      live: '#',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      metrics: {
        users: '2K+',
        uptime: '97.8%',
        performance: '89/100'
      }
    },
    {
      id: 4,
      title: 'DevOps Automation Suite',
      type: 'Infrastructure Tool',
      description: 'Complete CI/CD pipeline automation with monitoring, deployment, and scaling capabilities.',
      longDescription: 'Kubernetes-native solution with custom operators for automated scaling. Integrated monitoring with Prometheus and Grafana for comprehensive observability.',
      technologies: ['Go', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
      status: 'PRODUCTION',
      github: '#',
      live: '#',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
      metrics: {
        users: '500+',
        uptime: '99.95%',
        performance: '98/100'
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRODUCTION': return 'text-matrix-green border-matrix-green'
      case 'BETA': return 'text-cyber-blue border-cyber-blue'
      case 'DEVELOPMENT': return 'text-neon-purple border-neon-purple'
      default: return 'text-matrix-green border-matrix-green'
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Terminal */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="terminal-window p-6 mb-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              $ git log --oneline --graph --all
            </div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold holographic"
            >
              Project Repository
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-matrix-green mt-2"
            >
              Showcasing digital solutions that push boundaries
            </motion.p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                z: 20
              }}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              className="terminal-window p-6 cursor-pointer group"
            >
              <div className="mt-8">
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold holographic mb-1">
                      {project.title}
                    </h3>
                    <div className="text-sm text-cyber-blue">
                      {project.type}
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative mb-4 overflow-hidden border border-matrix-green">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-void via-transparent to-transparent opacity-60" />
                  
                  {/* Overlay Icons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.2, rotateZ: 360 }}
                      className="p-2 bg-dark-void bg-opacity-80 border border-matrix-green hover:border-hologram transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.2, rotateZ: 360 }}
                      className="p-2 bg-dark-void bg-opacity-80 border border-matrix-green hover:border-hologram transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-matrix-green text-sm mb-4 leading-relaxed">
                  {selectedProject === project.id ? project.longDescription : project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-cyber-blue text-cyber-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics (shown when expanded) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: selectedProject === project.id ? 'auto' : 0,
                    opacity: selectedProject === project.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-matrix-green pt-4 mt-4">
                    <div className="text-cyber-blue text-sm mb-2">
                      $ system_metrics --project={project.title.toLowerCase().replace(/\s+/g, '_')}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-hologram font-bold">{project.metrics.users}</div>
                        <div className="text-xs text-matrix-green">Active Users</div>
                      </div>
                      <div>
                        <div className="text-hologram font-bold">{project.metrics.uptime}</div>
                        <div className="text-xs text-matrix-green">Uptime</div>
                      </div>
                      <div>
                        <div className="text-hologram font-bold">{project.metrics.performance}</div>
                        <div className="text-xs text-matrix-green">Performance</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Expand Indicator */}
                <div className="text-center mt-4">
                  <motion.div
                    animate={{ rotateZ: selectedProject === project.id ? 180 : 0 }}
                    className="text-matrix-green text-sm"
                  >
                    {selectedProject === project.id ? '▲ collapse' : '▼ expand'}
                  </motion.div>
                </div>

                {/* Holographic border effect */}
                <motion.div
                  className="absolute inset-0 border border-hologram opacity-0 group-hover:opacity-30"
                  animate={{
                    scale: [1, 1.005, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="terminal-window p-6 mt-8"
        >
          <div className="mt-8 text-center">
            <div className="text-cyber-blue mb-4">
              $ find /projects -name "*.md" | wc -l
            </div>
            <div className="text-matrix-green mb-4">
              {projects.length} projects found in repository
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00ff41' }}
              whileTap={{ scale: 0.95 }}
              className="code-block px-6 py-3 border border-matrix-green hover:border-hologram transition-all duration-300"
            >
              $ git clone --all-projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ProjectsGrid